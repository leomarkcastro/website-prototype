function searchFunction() {
  localStorage.setItem("search", $("#sBBar").val());
  window.location.href = "./search.html";
}

function gridify(data) {
  var grid = $("#results");
  grid.empty();
  let elements = "";
  var rows = 4;
  var elementsPerRow = Math.floor(data.length / rows);
  for (var x = 0; x < rows; x++) {
    elements += `<div class="column">`;
    for (var y = elementsPerRow * x; y < elementsPerRow * (x + 1); y++) {
      elements += `<a href="${data[y].hostPageDisplayUrl}"><img src="${data[y].thumbnailUrl}" alt="fjords" style="width:100%" /></a>`;
    }
    elements += `</div>`;
  }
  grid.append(elements);
}

$(document).ready(function () {
  $("#sBBar").keypress(function (e) {
    e.key === "Enter" && searchFunction();
  });

  $("#sBButton").click(function () {
    searchFunction();
  });

  var options = {
    method: "GET",
    url: "https://bing-image-search1.p.rapidapi.com/images/search",
    params: { q: localStorage.getItem("search") || "Hello" },
    headers: {
      "X-RapidAPI-Host": "bing-image-search1.p.rapidapi.com",
      "X-RapidAPI-Key": "72699df91dmsha1384e3aed130dbp169dc7jsnf10719d7bc83",
    },
  };

  var grid = $("#results");
  grid.append(
    `<div class="searchLoading"><div class="lds-circle"><div></div></div><p>Fetching Images</p></div>`
  );

  axios
    .request(options)
    .then(function (response) {
      gridify(response.data.value);
    })
    .catch(function (error) {
      console.error(error);
    });
});
