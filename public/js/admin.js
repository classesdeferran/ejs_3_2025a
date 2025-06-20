const sectionInsert = document.querySelector("#insert")
const sectionUpdate = document.querySelector("#update")
sectionUpdate.style.display = "none"

function borrarDestino(id) {
    fetch(`/delete/${id}`,
        {method: "DELETE"}
    )
    .then(response => response.json())
    .then( setTimeout(() => location.reload() , 300)
    .catch(error => console.log(error))
    )
    }