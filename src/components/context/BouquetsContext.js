import React from 'react';
import { sanityClient } from '../../../sanity';

const FIVE_MINUTES = 300000;

const defaultState = {
  data: {},
  favoriteBouquets: [],
  addOrRemoveToFavorite: (bouquet) => {
    defaultState.favoriteBouquets.push(bouquet);
  },
  bouquetsInCarts: [],
  addToCart: (bouquet) => {

    defaultState.bouquetsInCarts.push(bouquet);
  },
  clearCart: () => {},
  removeFromCart: (bouquet) => {},
  icreaseQuantity: (bouquet) => {},
  decreaseQuantity: (bouquet) => {},
  setbouquetsCategories: (bouquet) => {},
  bouquetsCategories:[],
};

const BouquetsContext = React.createContext(defaultState);

class BouquetsProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data:{},
      favoriteBouquets: [],
      bouquetsInCarts: [],
      bouquetsCategories:[],

    };
  }
  // state = {
  //   favoriteBouquets: [],
  //   bouquetsInCarts: [],
  // };

  addOrRemoveToFavorite = (bouquet) => {
    this.setState((state) => {
      let newBouquetList = [];
      let carrentBouquetList = [...state.favoriteBouquets];
      if (!carrentBouquetList.find((item) => item.id === bouquet.id)) {
        newBouquetList = [...carrentBouquetList, bouquet];
        localStorage.setItem('Hearts', JSON.stringify(newBouquetList));
      } else {
        newBouquetList = carrentBouquetList.filter(
          (item) => item.id !== bouquet.id
        );
        localStorage.setItem('Hearts', JSON.stringify(newBouquetList));
      }
      return {
        favoriteBouquets: newBouquetList,
      };
    });
  };

  addToCart = (bouquet) => {
    this.setState((state) => {
      let newBouquetList = [];
      let carrentBouquetList = [...state.bouquetsInCarts];
      let currentBouquetInCart =carrentBouquetList.find((item) => item.id === bouquet.id)
      if (!currentBouquetInCart) {
        newBouquetList = [...carrentBouquetList, bouquet];
        localStorage.setItem('Cart', JSON.stringify(newBouquetList));
      } else {
        if(currentBouquetInCart.quantity !== bouquet.quantity){
          currentBouquetInCart.quantity = bouquet.quantity
        }
        newBouquetList = carrentBouquetList;
      }
      return {
        bouquetsInCarts: newBouquetList,
      };
    });
  };

  clearCart = () => {
    localStorage.removeItem('Cart');
    this.setState({
      bouquetsInCarts: [],
    });

  }

  icreaseQuantity = (id) => {
    this.setState((state) => {
      let newBouquetList = [];
      let carrentBouquetList = [...state.bouquetsInCarts];
      let curentBouquet = carrentBouquetList.find(
        (item) => item.id === id
      );
      if (curentBouquet) {
        curentBouquet.quantity += 1;
      }
      newBouquetList = [...carrentBouquetList];
      localStorage.setItem('Cart', JSON.stringify(newBouquetList));
      return {
        bouquetsInCarts: newBouquetList,
      };
    });
  };

  decreaseQuantity = (id) => {
    this.setState((state) => {
      let newBouquetList = [];
      let carrentBouquetList = [...state.bouquetsInCarts];
      let curentBouquet = carrentBouquetList.find(
        (item) => item.id === id
      );
      if (curentBouquet && curentBouquet.quantity > 1) {
        curentBouquet.quantity -= 1;
      }
      newBouquetList = [...carrentBouquetList];
      localStorage.setItem('Cart', JSON.stringify(newBouquetList));
      return {
        bouquetsInCarts: newBouquetList,
      };
    });
  };

  removeFromCart = (id) => {
    this.setState((state) => {
      let newBouquetList = [];
      let carrentBouquetList = [...state.bouquetsInCarts];
      if (carrentBouquetList.find((item) => item.id === id)) {
        newBouquetList = carrentBouquetList.filter((item) => item.id !== id);
        localStorage.setItem('Cart', JSON.stringify(newBouquetList));
      } else {
        newBouquetList = carrentBouquetList;
      }
      return {
        bouquetsInCarts: newBouquetList,
      };
    });
  };

  setbouquetsCategories = (bouquetsCategories) => {
    this.setState({ bouquetsCategories });
    // localStorage.setItem('Categories', JSON.stringify(bouquetsCategories));
    // this.state.bouquetsCategories = bouquetsCategories ;
  }

  componentDidMount() {
    const data = JSON.parse(localStorage.getItem('data'));
    const timeDifference = data?.time? Date.now() - data.time : null;
    if (data && (timeDifference && timeDifference < FIVE_MINUTES)) {
      this.setState({ data });
    } else {
      sanityClient.fetch(`*[ _type == "generalInfo"][0]{
        ...,
        "categories": *[ _type == "categoryList"][0]{
                _id,
                categories[]->{
                  _id,
                  slug,
                  title,
                  mainImage,
                  published,
                  bouqets[]->{
                    _id,
                    title,
                    slug,
                    images,
                    price,
                    description,
                  }
                },
              }
      }`)
      .then(data => {
          data.time = Date.now();
          localStorage.setItem('data', JSON.stringify(data));
          this.setState({ data });
        })
      .catch((e)=> console.log('Data wasn\'t received ', e))
    }

    const heartsList = JSON.parse(localStorage.getItem('Hearts'));
    if (heartsList) {
      this.setState({ favoriteBouquets: heartsList });
    }
    const cartList = JSON.parse(localStorage.getItem('Cart'));
    if (cartList) {
      this.setState({ bouquetsInCarts: cartList });
    }
    // const Categories = JSON.parse(localStorage.getItem('Categories'));
    // if (cartList) {
    //   this.setState({ bouquetsCategories: Categories });
    // }
  }

  render() {
    const { children } = this.props;
    const { data, favoriteBouquets, bouquetsInCarts, bouquetsCategories } = this.state;
    return (
      <BouquetsContext.Provider
        value={{
          data,
          favoriteBouquets,
          bouquetsInCarts,
          bouquetsCategories,
          addOrRemoveToFavorite: this.addOrRemoveToFavorite,
          addToCart: this.addToCart,
          clearCart: this.clearCart,
          removeFromCart: this.removeFromCart,
          icreaseQuantity: this.icreaseQuantity,
          decreaseQuantity: this.decreaseQuantity,
          setbouquetsCategories: this.setbouquetsCategories,
          
        }}
      >
        {children}
      </BouquetsContext.Provider>
    );
  }
}

export function useAppContext() {
  return React.useContext(BouquetsContext);
}

export default BouquetsContext;
export { BouquetsProvider };
