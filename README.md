# App för registrering och inloggning

Detta är ett API för att registrera, logga in, och verifiera användare i en databas, MongoDB, genom Mongoose.

Den använder bcrypt för att hascha lösenorden så de är säkra i databasen 
och jason web tokens för att autentisera inloggningar.

Eftersom webbappen som nyttjar denna API inte ligger i samma projekt används CORS för att göra fetch möjligt.

Server körs lokalt på: http://localhost3001

Möjliga requests är: 

POST till /api/register som tar emot username och password i body för att registrera nya användare. Användarnamn är unika.

POST till /api/login som tar emot username och password som redan är registrerade och ger tillbaka en token som kan användas för att autentisera användaren.

GET /api/protected som tar emot token för att validera den och ge tillgång till skyddade routes.
