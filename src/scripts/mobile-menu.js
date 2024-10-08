document.addEventListener('DOMContentLoaded', () => {
  const floatingButton = document.getElementById('floatingButton');
  const menu = document.getElementById('menu');

  floatingButton.innerHTML = "◀︎";

  floatingButton.addEventListener('click', () => {
    // Toggle the display of the menu
    if (menu.style.display === 'none' || menu.style.display === '') {
      floatingButton.innerHTML = "▶︎";
      menu.style.display = 'flex';
      menu.style.flexDirection = 'row';
    } else {
      menu.style.display = 'none';
      floatingButton.innerHTML = "◀︎";
    }
  });

  // Optional: Close the menu when clicking outside of it
  document.addEventListener('click', (event) => {
    if (!floatingButton.contains(event.target) && !menu.contains(event.target)) {
      menu.style.display = 'none';
    }
  });
});
