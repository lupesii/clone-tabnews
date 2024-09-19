function status(request, response) {
  response.status(200).json({ Lucas: "Programador" });
}

export default status;
