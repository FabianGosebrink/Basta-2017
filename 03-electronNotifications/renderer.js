console.log("from renderer...");

function myFunction() {
  let myNotification = new Notification('Title', {
    body: 'Lorem Ipsum Dolor Sit Amet'
  })

  myNotification.onclick = () => {
    console.log('Notification clicked')
  }
}