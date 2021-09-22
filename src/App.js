import {Component} from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  addCartItem = product => {
    const {cartList} = this.state
    const alreadyHaveItem = cartList.some(
      eachItem => eachItem.id === product.id,
    )
    if (!alreadyHaveItem) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      const updatedCartList = cartList.map(eachItem => {
        if (eachItem.id === product.id) {
          const modifiedItem = {
            availability: eachItem.availability,
            brand: eachItem.brand,
            description: eachItem.description,
            id: eachItem.id,
            imageUrl: eachItem.imageUrl,
            price: eachItem.price,
            quantity: eachItem.quantity + product.quantity,
            rating: eachItem.rating,
            title: eachItem.title,
            totalReviews: eachItem.totalReviews,
          }
          return modifiedItem
        }
        return eachItem
      })
      this.setState({cartList: updatedCartList})
    }
  }

  deleteCartItem = id => {
    const {cartList} = this.state
    const filteredCartList = cartList.filter(eachItem => eachItem.id !== id)
    this.setState({cartList: filteredCartList})
  }

  incrementQuantity = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.map(eachItem => {
      if (eachItem.id === id) {
        const modifiedItem = {
          availability: eachItem.availability,
          brand: eachItem.brand,
          description: eachItem.description,
          id: eachItem.id,
          imageUrl: eachItem.imageUrl,
          price: eachItem.price,
          quantity: eachItem.quantity + 1,
          rating: eachItem.rating,
          title: eachItem.title,
          totalReviews: eachItem.totalReviews,
        }
        return modifiedItem
      }
      return eachItem
    })
    this.setState({cartList: updatedCartList})
  }

  decrementQuantity = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.map(eachItem => {
      if (eachItem.id === id) {
        let updatedQuantity = eachItem.quantity
        if (eachItem.quantity > 0) {
          updatedQuantity -= 1
        }
        const modifiedItem = {
          availability: eachItem.availability,
          brand: eachItem.brand,
          description: eachItem.description,
          id: eachItem.id,
          imageUrl: eachItem.imageUrl,
          price: eachItem.price,
          quantity: updatedQuantity,
          rating: eachItem.rating,
          title: eachItem.title,
          totalReviews: eachItem.totalReviews,
        }
        return modifiedItem
      }
      return eachItem
    })
    this.setState({cartList: updatedCartList})
  }

  render() {
    const {cartList} = this.state

    return (
      <BrowserRouter>
        <CartContext.Provider
          value={{
            cartList,
            addCartItem: this.addCartItem,
            deleteCartItem: this.deleteCartItem,
            incrementQuantity: this.incrementQuantity,
            decrementQuantity: this.decrementQuantity,
          }}
        >
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/products" component={Products} />
            <ProtectedRoute
              exact
              path="/products/:id"
              component={ProductItemDetails}
            />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="not-found" />
          </Switch>
        </CartContext.Provider>
      </BrowserRouter>
    )
  }
}

export default App
