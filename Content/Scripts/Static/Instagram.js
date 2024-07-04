const targetNodeinstagram = document.querySelector('.instagram-posts');

const configinstagram = {
  childList: true, // çocuk düğümlerde değişiklikler izlenir
  subtree: true, // alt ağaçtaki düğümlerde değişiklikler izlenir
};
// Gözlemci işlevi
const callbackinstagram = function (mutationsList, observerinstagram) {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList') {
      // İçerik değişikliklerini kontrol et
      const elements = document.querySelectorAll(
        '.instagram-posts .eapps-instagram-feed > a'
      );
      elements.forEach((element) => {
        element.removeAttribute('style'); // Inline style'ları kaldır
      });
      const elementLoadMore = document.querySelector(
        '.instagram-posts .eapps-instagram-feed .eapps-instagram-feed-posts-grid-load-more-text'
      );

      if (elementLoadMore) {
        console.log('elementLoadMore');
        elementLoadMore.innerText = 'Daha Fazla Yükle';
      }
      if (elementLoadMore && elements.length) {
        observerinstagram.disconnect();
      }
    }
  }
};

// MutationObserver'ı başlat
const observerinstagram = new MutationObserver(callbackinstagram);
observerinstagram.observe(targetNodeinstagram, configinstagram);

// Sayfa yüklemesi tamamlandığında başlangıç kontrolü
window.addEventListener('load', () => {
  const elements = document.querySelectorAll(
    '.instagram-posts .eapps-instagram-feed > a'
  );
  elements.forEach((element) => {
    element.removeAttribute('style'); // Inline style'ları kaldır
  });
  const elementLoadMore = document.querySelector(
    '.instagram-posts .eapps-instagram-feed .eapps-instagram-feed-posts-grid-load-more-text'
  );
  if (elementLoadMore) {
    console.log('elementLoadMore');
    elementLoadMore.innerText = 'Daha Fazla Yükle';
  }
});
