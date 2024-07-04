// .google-comments elementini seç
const targetNode = document.querySelector('.google-comments');

// MutationObserver yapılandırması
const config = {
  childList: true, // çocuk düğümlerde değişiklikler izlenir
  subtree: true, // alt ağaçtaki düğümlerde değişiklikler izlenir
};
// Gözlemci işlevi
const callback = function (mutationsList, observer) {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList') {
      // İçerik değişikliklerini kontrol et
      const elements = document.querySelectorAll(
        '.google-comments [class^="WidgetBackground__Content-"] a'
      );
      elements.forEach((element) => {
        element.removeAttribute('style'); // Inline style'ları kaldır
      });
      const elementLoadMore = document.querySelector(
        '.google-comments [class^="ButtonBase__Ellipsis-sc"]'
      );
      if (elementLoadMore) {
        console.log('elementLoadMore');
        elementLoadMore.innerText = 'Daha Fazla Yükle';
      }
      if (elementLoadMore && elements.length) {
        observer.disconnect();
      }
    }
  }
};

// MutationObserver'ı başlat
const observer = new MutationObserver(callback);
observer.observe(targetNode, config);

// Sayfa yüklemesi tamamlandığında başlangıç kontrolü
window.addEventListener('load', () => {
  const elements = document.querySelectorAll(
    '.google-comments [class^="WidgetBackground__Content-"] a'
  );
  elements.forEach((element) => {
    element.removeAttribute('style'); // Inline style'ları kaldır
  });
  const elementLoadMore = document.querySelector(
    '.google-comments [class^="ButtonBase__Ellipsis-sc"]'
  );
  if (elementLoadMore) {
    console.log('elementLoadMore');
    elementLoadMore.innerText = 'Daha Fazla Yükle';
  }
});
