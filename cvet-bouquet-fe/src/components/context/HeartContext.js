import React from "react"
const defaultState = {
  favoriteBouquets:[],
  addOrRemoveToFavorite:(bouquet)=>{defaultState.favoriteBouquets.push(bouquet)},
  bouquetsInCarts:[],
  addOrRemoveToCart: (bouquet)=>{defaultState.bouquetsInCarts.push(bouquet)},
}

const HeartContext = React.createContext(defaultState)

class HeartProvider extends React.Component {
  state = {
    favoriteBouquets: [],
    bouquetsInCarts:[],
  }

  addOrRemoveToFavorite = (bouquet) => {
    this.setState(state => {
      let newBouquetList=[];
      let carrentBouquetList=[...state.favoriteBouquets]
      if(!(carrentBouquetList.find((item)=>item.id===bouquet.id))){
        newBouquetList = [...carrentBouquetList,bouquet];
        localStorage.setItem("Hearts", JSON.stringify(newBouquetList));
      }else{
        newBouquetList = carrentBouquetList.filter((item)=>item.id!==bouquet.id)
        localStorage.setItem("Hearts", JSON.stringify(newBouquetList));
      }
      return {
        favoriteBouquets:newBouquetList,
      };
    });
  }

  addOrRemoveToCart = (bouquet) => {
    this.setState(state => {
      let newBouquetList=[];
      let carrentBouquetList=[...state.bouquetsInCarts]
      if(!(carrentBouquetList.find((item)=>item.id===bouquet.id))){
        newBouquetList = [...carrentBouquetList,bouquet];
        localStorage.setItem("Cart", JSON.stringify(newBouquetList));
      }else{
        newBouquetList = carrentBouquetList.filter((item)=>item.id!==bouquet.id)
        localStorage.setItem("Cart", JSON.stringify(newBouquetList));
      }
      return {
        bouquetsInCarts:newBouquetList,
      };
    });
  }

  componentDidMount() {
    const heartsList = JSON.parse(localStorage.getItem("Hearts"))
    if (heartsList) {
      this.setState({ favoriteBouquets: heartsList })
    }
    const cartList = JSON.parse(localStorage.getItem("Cart"))
    if (cartList) {
      this.setState({ bouquetsInCarts: cartList })
    }
  }
  render() {
    const { children } = this.props
    const { favoriteBouquets, bouquetsInCarts } = this.state
    return (
      <HeartContext.Provider
        value={{
          favoriteBouquets,
          bouquetsInCarts,
          addOrRemoveToFavorite: this.addOrRemoveToFavorite,
          addOrRemoveToCart: this.addOrRemoveToCart,
        }}
      >
        {children}
      </HeartContext.Provider>
    )
  }
}

export function useAppContext() {
  return React.useContext(HeartContext);
}

export default HeartContext
export { HeartProvider }