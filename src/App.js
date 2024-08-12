import React, { useEffect } from 'react';
import photoCard1 from './img/photo1.jpg';
import photoCard2 from './img/photo2.jpg';
import './App.css';

function App() {

  useEffect(() => {
    var prevScrollpos = window.pageYOffset;

    function handleScroll() {
        var currentScrollPos = window.pageYOffset;

        if (prevScrollpos > currentScrollPos) {
            document.querySelector('.scrolling-navbar').classList.remove('hidden');
        } else {
            document.querySelector('.scrolling-navbar').classList.add('hidden');
        }

        prevScrollpos = currentScrollPos;
    }

    var selectElement = document.getElementById('floatingSelect');
    var sortBySelectElement = document.getElementById('sortBySelect');

    function handleSelectChange() {
        var selectedValue = parseInt(selectElement.value);
        saveShowPerPageToLocalStorage(selectedValue);
        localStorage.setItem('selectedValue', selectedValue);
        adjustCardDisplay(selectedValue);
        updateShowingText(selectedValue);
    }

    function handleSortByChange() {
        var selectedSortValue = sortBySelectElement.value;
        saveSortByToLocalStorage(selectedSortValue);
        sortCards(selectedSortValue);
    }

    function saveShowPerPageToLocalStorage(value) {
        localStorage.setItem('showPerPage', value);
    }

    function getShowPerPageFromLocalStorage() {
        return parseInt(localStorage.getItem('showPerPage'));
    }

    function updateShowingText(selectedValue) {
        var showingTextElement = document.querySelector('#sort-list .text');
        var upperBound = selectedValue < 100 ? selectedValue : 100;
        showingTextElement.textContent = `Showing 1 - ${upperBound} of 100`;
    }

    function adjustCardDisplay(cardsPerPage) {
        var cards = document.querySelectorAll('.card');
        cards.forEach(function (card, index) {
            card.style.display = 'none';
        });

        for (var i = 0; i < cardsPerPage && i < cards.length; i++) {
            cards[i].style.display = 'block';
        }
    }

    function saveSortByToLocalStorage(value) {
        localStorage.setItem('sortBy', value);
    }

    function getSortByFromLocalStorage() {
        return localStorage.getItem('sortBy');
    }

    function sortCards(sortValue) {
        var cards = document.querySelectorAll('.card');
        var cardsArray = Array.from(cards);

        if (sortValue === 'newest') {
            cardsArray.sort(compareDatesDesc);
        } else if (sortValue === 'oldest') {
            cardsArray.sort(compareDatesAsc);
        }

        var cardContainer = document.getElementById('cardContainer');
        cardContainer.innerHTML = '';

        cardsArray.forEach(function (card) {
            cardContainer.appendChild(card);
        });
    }

    function compareDatesAsc(card1, card2) {
        var date1 = new Date(card1.querySelector('.card-date').textContent);
        var date2 = new Date(card2.querySelector('.card-date').textContent);
        return date1 - date2;
    }

    function compareDatesDesc(card1, card2) {
        var date1 = new Date(card1.querySelector('.card-date').textContent);
        var date2 = new Date(card2.querySelector('.card-date').textContent);
        return date2 - date1;
    }

    function generateCards() {
        const cardContainer = document.getElementById('cardContainer');
        const existingCard = document.querySelector('.card');

        cardContainer.innerHTML = '';

        for (let i = 0; i < 100; i++) {
            if (i === 5) {
                continue;
            }

            const newCard = existingCard.cloneNode(true);

            newCard.querySelector('.card-text').textContent = getCardText(i);

            const imageUrl = i % 2 === 0 ?
                photoCard1 :
                photoCard2 ;

            newCard.querySelector('.card-img-top').src = imageUrl;

            const randomDate = generateRandomDate();
            newCard.querySelector('.card-date').textContent = randomDate;

            cardContainer.appendChild(newCard);
        }
    }

    function generateRandomDate() {
        const startDate = new Date('2020-01-01');
        const endDate = new Date('2023-12-31');

        const randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));

        const options = { day: '2-digit', month: 'long', year: 'numeric' };
        return randomDate.toLocaleDateString('en-US', options);
    }

    function getCardText(index) {
        return index % 2 === 0 ?
            "Jangan Asal Pilih Influencer Berikut Cara Menyusun Strategi Influencer agar hidup tenang dan nyaman" :
            "Kenali Tingkatan Influencers berdasarkan jumlah Followers";
    }

      window.addEventListener('scroll', handleScroll);
      selectElement.addEventListener('change', handleSelectChange);
      sortBySelectElement.addEventListener('change', handleSortByChange);
      window.onscroll = handleScroll;
      generateCards();

      var initialShowPerPage = getShowPerPageFromLocalStorage() || 10;
      adjustCardDisplay(initialShowPerPage);
      selectElement.value = initialShowPerPage;
      updateShowingText(initialShowPerPage);

      var initialSortValue = getSortByFromLocalStorage() || 'newest';
      sortBySelectElement.value = initialSortValue;
      sortCards(initialSortValue);

    return () => {
        window.removeEventListener('scroll', handleScroll);
        selectElement.removeEventListener('change', handleSelectChange);
        sortBySelectElement.removeEventListener('change', handleSortByChange);
    };
  }, []);


  return (
    <div className="Suitmedia">
      <title>Suitmedia</title>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
        crossOrigin="anonymous"
      />
      <header>
        <nav className="navbar navbar-expand-lg shadow-sm fixed-top navbar-dark scrolling-navbar" style={{ backgroundColor: "#ea6125" }}>
          <div className="container">
            <a className="navbar-brand fw-bold" href="#">
              <img src={require('./img/logo-suitmedia.png')} alt="Logo" width={120} height={50} className="d-inline-block align-text-top"/>
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
              aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav ms-auto">
                <a className="nav-link" href="#"> Work </a>
                <a className="nav-link" href="#"> Services </a>
                <a className="nav-link" href="#"> About </a>
                <a className="nav-link active" href="#"> Ideas </a>
                <a className="nav-link" href="#"> Careers </a>
                <a className="nav-link" href="#"> Contact </a>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <section id="banner">
        <div className="parallax">
          <div className="banner">
            <img src={require('./img/banner.jpg')} alt="" loading="lazy" />
            <div className="banner-text">
              <h1>Ideas</h1>
              <p>Where all our great things begin</p>
            </div>
          </div>
        </div>
      </section>
      <section id="sort-list">
        <div className="p-5">
          <div className="container">
            <div className="row">
              <div className="col-6">
                <div className="text">Showing 1 - 10 of 100</div>
              </div>
              <div className="col-6">
                <div className="row align-items-center">
                  <div className="col-3">
                    <div className="text mb-0">Show per Page:</div>
                  </div>
                  <div className="col">
                    <select className="form form-select mb-0" id="floatingSelect" aria-label="Floating label select example" >
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                      <option value={50}>50</option>
                    </select>
                  </div>
                  <div className="col-2">
                    <div className="text mb-0">Sort by :</div>
                  </div>
                  <div className="col">
                    <select className="form form-select mb-0" id="sortBySelect" aria-label="Floating label select example" >
                      <option value="newest">Newest</option>
                      <option value="oldest">Oldest</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="card">
        <div className="p-5" id="cardContainer">
          <div className="card" style={{ width: "18rem" }}>
            <img src={require('./img/banner1.jpg')} className="card-img-top" alt="..." loading="lazy"/>
            <div className="card-body">
              <p className="card-date text-danger">23 Mei 2023</p>
              <p className="card-text fw-bold">
                Membaca dapat meningkatkan kemampuan fungsi otak!
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="center d-flex justify-content-center">
        <div className="pagination pb-5">
          <a href="#">«</a>
          <a href="#" className="active"> 1 </a>
          <a href="#">2</a>
          <a href="#">3</a>
          <a href="#">4</a>
          <a href="#">5</a>
          <a href="#">6</a>
          <a href="#">»</a>
        </div>
      </div>
    </div>
  );
}

export default App;
