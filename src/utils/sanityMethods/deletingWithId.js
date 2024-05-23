
function deletingWithId(client,id){
  client.delete({query: `*[_id == "${id}"]`}).then(() => {
    console.log(`was deleted`)
  })
  .catch((err) => {
    console.error('Delete failed: ', err.message)
  })
}

export default deletingWithId;