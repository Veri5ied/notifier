self.addEventListener("push", (event) => {
  const data = event.data.json();

  self.registration.showNotification(data.title, {
    body: "Thank you for subscribing to this course, yay!",
  });
});
