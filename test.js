meds.forEach(med => {

  var medX = med.getBoundingClientRect().left;

  medX -= diagonalmoveSpeed;
  med.style.left = medX + "px";
});