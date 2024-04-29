import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs} from "firebase/firestore";
import { db } from "../../Firebase";




const initialState = {productsList:[], useProductList:[],
sliderValue:200000, productFetchStatus: "idle", productFetchError: null,
filtByMens:false, filtByWomen:false, jewel:false, Electronics:false,
cartItems:[]};

// Fetch Products
export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Products"));
        const card = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        return card;
      } catch (error) {
        throw error; // Throwing error to be caught by the rejected action
      }
    }
  );

const productSlice = createSlice({
    name:'products',
    initialState,

    reducers:{
        setProductsList:(state, action)=>{
            state.productsList = action.payload;
        },

        setUseProductList:(state, action)=>{
            state.useProductList = action.payload;
        },

        setSliderValue:(state, action)=>{
            state.sliderValue = action.payload;
        },

        setfiltByMens:(state, action)=>{
            state.filtByMens = action.payload;
        },

        setfiltByWomen:(state, action)=>{
            state.filtByWomen = action.payload;
        },

        setfiltByJewel:(state, action)=>{
            state.jewel = action.payload;
        },

        setElectronics:(state, action)=>{
            state.Electronics = action.payload;
        },

        setCartItems:(state, action)=>{
            state.cartItems = action.payload;
        },

        
          
        updateCartItemQuantity: (state, action) => {
            const { Name, isItemPresent } = action.payload;
            console.log(Name, isItemPresent.Quantity+1);
            const productToUpdate = state.cartItems.find(product => product.Name === Name);
            if (productToUpdate) {
              productToUpdate.Quantity = isItemPresent.Quantity+1;
            }
            
        },
        // Action creator for adding a new product to the cart
        addNewProductToCart: (state, action) => {
            const { Name, Price, Image } = action.payload;
            console.log(action.payload.Name, Price, Image);
            state.cartItems.push({ Name, Price, Quantity: 1, Image });
            console.log('CartItems Now', state.cartItems);
          }
        },
    

    extraReducers:(builder)=>{
        builder
        .addCase(fetchProducts.pending, (state)=>{
            state.productFetchStatus = "loading";
        })
        .addCase(fetchProducts.fulfilled, (state, action)=>{
            state.productFetchStatus = "succeeded";
            state.productsList = action.payload;
            state.useProductList = action.payload;
            console.log('Product stored are: ',state.useProductList);
        })
        .addCase(fetchProducts.rejected, (state, action) => {
            state.productFetchStatus = "failed";
            state.error = action.payload;
        });
    }
})

export const productReducer = productSlice.reducer;
export const {setProductsList, setUseProductList, setSliderValue, setfiltByMens, setfiltByWomen, setElectronics, setfiltByJewel, setCartItems, updateCartItemQuantity, addNewProductToCart} = productSlice.actions;
export const productSelector = (state)=>state.productReducer;