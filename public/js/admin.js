function borrarDestino(id) {
        fetch(`/delete/${id}`,
          {method: "DELETE"}
        )
        .then(response => response.json())
        .then( setTimeout(() => location.reload() , 300)   )
      }