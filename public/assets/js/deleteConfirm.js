const formDelete = document.querySelector("#form-delete");

formDelete.addEventListener("submit" , (event) => {
    const confirmation = confirm("Você realmente quer deletar esse usuário?")

    if(!confirmation) {
        event.preventDefault();
    }
});