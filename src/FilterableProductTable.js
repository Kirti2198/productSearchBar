import { useState } from "react";

const ProductCategoryRows = ({ productCategory }) => {
  return (
    <tr>
      {" "}
      <th colSpan={2}> {productCategory} </th>
    </tr>
  );
};

const ProductRow = ({ product }) => {
  const { name, price, stocked } = product;
  const productName = stocked ? (
    name
  ) : (
    <span style={{ color: "red" }}> {name} </span>
  );
  return (
    <tr>
      <td>{productName}</td>
      <td>{price}</td>
    </tr>
  );
};

const ProductTable = ({ products, filterText, inStockOnly }) => {
  let rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }

    if (inStockOnly && !product.stocked) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRows
          productCategory={product.category}
          key={product.category}
        />
      );
      lastCategory = product.category;
    }
    rows.push(<ProductRow product={product} key={product.name} />);
  });
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th> Price </th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

const SearchBar = ({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange,
}) => {
  return (
    <>
      <form>
        <input
          placeholder="search..."
          value={filterText}
          onChange={(e) => {
            onFilterTextChange(e.target.value);
          }}
        />
        <label>
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => {
              onInStockOnlyChange(e.target.checked);
            }}
          />{" "}
          Only Show Products in Stock
        </label>
      </form>
    </>
  );
};

const FilterableProductTable = ({ data }) => {
  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockeOnly] = useState(false);
  return (
    <>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockeOnly}
      />
      <ProductTable
        products={data}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
    </>
  );
};

export default FilterableProductTable;
