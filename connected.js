function Connected() {
    const tokens = sessionStorage.getItem('tibule');
    if (tokens) {
        window.location.href = "/"
    }
}

Connected()