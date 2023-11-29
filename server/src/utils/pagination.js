
/**
 * Allows us to go through lists with pagination
 * @author Israel Aristide
 * @param {*} list - The list to paginate.
 * @param {*} itemsPerPage - How many list items should be in each page
 * @param {*} selectedPage - The page we want to get
 * @returns The selected page and the total amount of pages in the list
 */
function paginate(list, itemsPerPage, selectedPage) {

  const pages = Math.ceil(list.length / itemsPerPage);
  
  if (list.length === 0 || selectedPage > pages || selectedPage < 1) {
    return {page:[], pages: 0};
  }

  const page = [...list].splice ( (selectedPage - 1) * itemsPerPage, itemsPerPage);

  return {page: page, pages: pages};

}

module.exports = {paginate:paginate};