import {View, Text, FlatList} from "react-native";
import {useSelector} from "react-redux";
import {RouteProp, useRoute} from "@react-navigation/native";
import {ProductListScreenParam} from "../hooks/navigation/useNavigateToProductList";
import {selectedProductsForCategory, selectMenu} from "../feature/menu/slice/menuSlice";
import {RootState} from "../app/store";
import ProductDetail from "../components/product/ProductDetail";
import {ProductDTO} from "../model/dto/ProductDTO";
import {ProductCategoryDTO} from "../model/dto/ProductCategoryDTO";
import ProductCategoryListItem from "../components/category/ProductCategoryListItem";
import ProductListItem from "../components/product/ProductListItem";
const renderItem = ({ item }:{item:ProductDTO}) => {
    return <ProductListItem productDTO={item}/>
}
const keyExtractor = (productDTO:ProductDTO, index:number) => index.toString()

export default () => {
    const route = useRoute<RouteProp<ProductListScreenParam>>();
    const {categoryId} = route.params;
    const productDTO = useSelector<RootState,ProductDTO[]>(state => selectedProductsForCategory(state, categoryId));
    // console.log(products,'itemsite44das222uihdaigsmen999umsproducts')
    // const products = useSelector<RootState>(state => state.menu.products)
    // console.log(products,'MENUUUUUPRODUCTS')

    // const selectedProductsByProductCategory = useSelector(selectedProductsForCategory)
    // return<View>
    //     {/*<Text>{products}</Text>*/}
    //     {products.map(product => <ProductDetail productDTO={product} />)}
    // </View>
    return  <FlatList
    keyExtractor={keyExtractor}
    data={productDTO}
    renderItem={renderItem}></FlatList>

}