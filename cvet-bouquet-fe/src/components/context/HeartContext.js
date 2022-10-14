import React from "react"
const defaultState = {
  bouquetList:[],
  addOrRemoveBouquet:(bouquet)=>{defaultState.push(bouquet)},
}

const HeartContext = React.createContext(defaultState)

class HeartProvider extends React.Component {
  state = {
    bouquetList: [],
  }

  addOrRemoveBouquet = (bouquet) => {
    this.setState(state => {
      console.log(state)
      let newBouquetList=[];
      let carrentBouquetList=[...state.bouquetList]
      if(!(carrentBouquetList.find((item)=>item.id===bouquet.id))){
        newBouquetList = [...carrentBouquetList,bouquet];
        localStorage.setItem("Hearts", JSON.stringify(newBouquetList));
      }else{
        newBouquetList = carrentBouquetList.filter((item)=>item.id!==bouquet.id)
        localStorage.setItem("Hearts", JSON.stringify(newBouquetList));
      }
      return {
        bouquetList:newBouquetList,
      };
    });
  }

  componentDidMount() {
    const heartsList = JSON.parse(localStorage.getItem("Hearts"))
    if (heartsList) {
      this.setState({ bouquetList: heartsList })
    }
  }
  render() {
    const { children } = this.props
    const { bouquetList } = this.state
    return (
      <HeartContext.Provider
        value={{
          bouquetList,
          addOrRemoveBouquet: this.addOrRemoveBouquet,
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