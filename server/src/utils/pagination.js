
function paginate(list, itemsPerPage, selectedPage) {

  const pages = Math.round(list.length / itemsPerPage);

  if (selectedPage > pages || selectedPage < 1) {
    return {page:[], pages: 0};
  }

  const page = [...list].splice ( (selectedPage - 1) * itemsPerPage, itemsPerPage);

  return {page: page, pages: pages};

}

module.exports = {paginate:paginate};