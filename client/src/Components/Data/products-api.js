import axios from "axios";
const productsApi={
    userProfile:id => axios.post(`/api/products/user/products/${id}`), 
    Product:id=> axios.get(`/api/products/product/${id}`),
    catagorySearch:cat=>axios.get(`/api/products/category`),
    CheckCart:user=>axios.get(`/api/products/cart/${user}`)

    
}
export {
    productsApi as default
  };
  