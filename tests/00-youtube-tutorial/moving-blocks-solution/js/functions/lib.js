/// we kunnen hier ook een bepaalde waarde gaan exporteren 
// en dan gebruiken in de script.js 
export const AmountParticles = 100;

// geen default export !!! 
// want we importeren een functie en geen classe! 
// je mag dat ook default exporteren 
export const random = (min = 0, max = 1) => {
    return Math.random() * (max - min) + min;
}

// waarom export default vector
// omdat er maar 1 classe in zit

// maar als je meer functies hebt in 1 file 
// beter om apart te exporteren
// dus hier kiezen we voor niet export default want 
// ik hier misschien nog verschillende functies in zetten 