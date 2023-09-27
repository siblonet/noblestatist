function navigateTo(route) {
  // Check if conditions are met for accessing the admin area
  if (route === 'login') {
    // For example, check if the user is an admin
    const isAdmin = checkIfAdmin(); // Implement this function as needed

    if (!isAdmin) {
      alert('You do not have access to the admin area.');
      return; // Stop navigation if conditions are not met
    }

    // If user is an admin, redirect to admin.html
    window.location.href = 'file:///home/dell/Bureau/Silence%20AI/Projects/TypeScript/Frontend/Web/noblestatist/login.html';
    return;
  }

  // Update the URL without reloading the page
  history.pushState({ route: route }, route, `/${route}`);
}

function checkIfAdmin() {
  
  return true;
}
