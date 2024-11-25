document.addEventListener("DOMContentLoaded", () => {
  const menubar = document.getElementById("menubar");
  const menubarSecond = document.getElementById("menubarSecond");
  const menubarExt = document.getElementById("menubarExt");
  const menubarExtExt = document.getElementById("menubarExtExt");

  // Variable description.
  // TODO: change these later to a more meaningful variable names
  //
  // menubar -> selector for standard menu bar navigation on 1st taskbar element
  // menubarSecond -> selector for secondary menubar for articles and notes
  //
  // menubarExt -> standard menu bar
  // menubarExtExt -> menu bar for articles and notes

  menubar.addEventListener("click", () => {
    // Toggle the display of the menu
    if (
      menubarExt.style.display === "none" ||
      menubarExt.style.display === ""
    ) {
      menubarExt.style.display = "flex";
      menubarExt.style.flexDirection = "row";
    } else {
      menubarExt.style.display = "none";
      menubarExt.style.fontSize = "1rem";
    }
  });

  menubarSecond.addEventListener("click", () => {
    // Toggle the display of the menu
    if (
      menubarExtExt.style.display === "none" ||
      menubarExtExt.style.display === ""
    ) {
      menubarExtExt.style.display = "flex";
      menubarExtExt.style.flexDirection = "row";
    } else {
      menubarExtExt.style.display = "none";
      menubarExtExt.style.fontSize = "1rem";
    }
  });

  // Optional: Close the menu when clicking outside of it
  document.addEventListener("click", (event) => {
    if (
      !menubarSecond.contains(event.target) &&
      !menubarExtExt.contains(event.target)
    ) {
      menubarExtExt.style.display = "none";
    }
  });

  // Optional: Close the menu when clicking outside of it
  document.addEventListener("click", (event) => {
    if (!menubar.contains(event.target) && !menubarExt.contains(event.target)) {
      menubarExt.style.display = "none";
    }
  });

  // Visibility on scroll for the taskbar
  // function toggleVisibility() {
  //   if (window.scrollY > 60) {
  //     taskbar.classList.add('visible');
  //   }
  //   else {
  //     taskbar.classList.remove('visible');
  //   }
  // }

  // toggleVisibility();

  // window.addEventListener('scroll', toggleVisibility);
});
