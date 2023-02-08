function size(number){
  return {
    xs:number*0.5,
    md:number*0.75,
    xl:number,
    xxl:`${((number/1920)*100).toFixed(2)}vw`
  }
  
}
export default size;