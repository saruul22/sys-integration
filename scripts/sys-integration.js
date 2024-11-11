const apiKey = 'c22b5f9be653678c2595b41be111d259';

window.addEventListener('load', async () => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Ulaanbaatar&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        document.getElementById('header-temperature').textContent = Math.round(data.main.temp);
        document.getElementById('header-description').textContent = data.weather[0].description;
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
});

function handleCredentialResponse(response) {
    const data = jwt_decode(response.credential);
    
    document.getElementById("user-name").innerText = data.name;
    document.getElementById("user-email").innerText = data.email;
    document.getElementById("user-picture").src = data.picture;
    
    document.getElementById("user-card").classList.remove("hidden");
    document.getElementById("google-signin-btn").style.display = "none";
}

function initializeGoogleSignIn() {
    google.accounts.id.initialize({
        client_id: "572977976252-cjhrbcfb6gr9rg0254dc1rpol41qies0.apps.googleusercontent.com",
        callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(
        document.getElementById("google-signin-btn"),
        { 
            theme: "filled_blue",
            size: "large",
            shape: "pill",
            width: 250
        }
    );
    google.accounts.id.prompt();
}