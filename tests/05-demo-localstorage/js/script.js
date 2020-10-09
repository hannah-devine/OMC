{

  const handleSubmitForm = e => {
    e.preventDefault();
    // de inhoud van de tekstvelden ophalen via het attribute value
    const firstname = document.querySelector(`.firstname`).value;
    console.log(firstname);
    localStorage.setItem('name', firstname);
  }

  const init = () => {
    localStorage.setItem('myCat', 'Tom');
    console.log(localStorage.key(0));
    // hier haal ik van de key de value op
    const value = localStorage.getItem('myCat');
    console.log(value);

    // luisteren naar het verzenden van het formulier
    const $form = document.querySelector(`.form-register`);
    $form.addEventListener(`submit`, handleSubmitForm);
  }
  init();
}
