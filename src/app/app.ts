import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface FoodItem {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
}

interface CartItem extends FoodItem {
  quantity: number;
}

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  selectedCategory = 'All';

  showCart = false;
  showCheckout = false;
  orderPlaced = false;

  customerName = '';
  customerPhone = '';
  customerAddress = '';

  categories = [
    'All',
    'Starters',
    'Biryani',
    'Main Course',
    'South Indian',
    'Breads',
    'Snacks',
    'Desserts',
    'Beverages'
  ];

  foodItems: FoodItem[] = [

    {
      id: 1,
      name: 'Paneer Tikka',
      category: 'Starters',
      description: 'Char-grilled paneer with aromatic Indian spices.',
      price: 220,
      image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=900&q=80'
    },

    {
      id: 2,
      name: 'Chicken 65',
      category: 'Starters',
      description: 'Crispy chicken tossed with South Indian spices.',
      price: 240,
      image: 'https://images.unsplash.com/photo-1608039755401-742074f0548d?auto=format&fit=crop&w=900&q=80'
    },

    {
      id: 3,
      name: 'Chicken Biryani',
      category: 'Biryani',
      description: 'Fragrant basmati rice cooked with tender chicken.',
      price: 250,
      image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=900&q=80'
    },

 

    {
      id: 5,
      name: 'Veg Biryani',
      category: 'Biryani',
      description: 'Aromatic basmati rice with fresh vegetables.',
      price: 180,
      image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=900&q=80'
    },

    {
      id: 6,
      name: 'Butter Chicken',
      category: 'Main Course',
      description: 'Tender chicken cooked in creamy tomato gravy.',
      price: 280,
      image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=900&q=80'
    },

    {
      id: 7,
      name: 'Paneer Butter Masala',
      category: 'Main Course',
      description: 'Soft paneer in a rich buttery tomato gravy.',
      price: 220,
      image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=900&q=80'
    },

    {
      id: 8,
      name: 'Masala Dosa',
      category: 'South Indian',
      description: 'Crispy dosa served with potato masala.',
      price: 110,
      image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=900&q=80'
    },

    {
      id: 9,
      name: 'Idli Vada',
      category: 'South Indian',
      description: 'Soft idlis and crispy vada served with chutney.',
      price: 90,
      image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=900&q=80'
    },

    {
      id: 10,
      name: 'Garlic Naan',
      category: 'Breads',
      description: 'Soft naan topped with garlic and coriander.',
      price: 70,
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80'
    },

    {
      id: 11,
      name: 'Chicken Sandwich',
      category: 'Snacks',
      description: 'Grilled chicken sandwich with fresh vegetables.',
      price: 190,
      image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=80'
    },

    {
      id: 12,
      name: 'French Fries',
      category: 'Snacks',
      description: 'Golden crispy fries served with a dip.',
      price: 130,
      image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=80'
    },

   

    {
      id: 14,
      name: 'Brownie with Ice Cream',
      category: 'Desserts',
      description: 'Warm chocolate brownie with vanilla ice cream.',
      price: 180,
      image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?auto=format&fit=crop&w=900&q=80'
    },

    {
      id: 15,
      name: 'Mango Lassi',
      category: 'Beverages',
      description: 'Refreshing creamy mango yogurt drink.',
      price: 120,
      image: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=900&q=80'
    },

    {
      id: 16,
      name: 'Cold Coffee',
      category: 'Beverages',
      description: 'Chilled creamy coffee with a smooth finish.',
      price: 140,
      image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=80'
    }

  ];

  cart: CartItem[] = [];

  get filteredFood(): FoodItem[] {
    if (this.selectedCategory === 'All') {
      return this.foodItems;
    }

    return this.foodItems.filter(
      food => food.category === this.selectedCategory
    );
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
  }

  addToCart(food: FoodItem): void {

    const existingItem = this.cart.find(
      item => item.id === food.id
    );

    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cart.push({
        ...food,
        quantity: 1
      });
    }

    this.showCart = true;
  }

  increaseQuantity(item: CartItem): void {
    item.quantity++;
  }

  decreaseQuantity(item: CartItem): void {

    if (item.quantity > 1) {
      item.quantity--;
    } else {
      this.removeFromCart(item);
    }
  }

  removeFromCart(item: CartItem): void {
    this.cart = this.cart.filter(
      cartItem => cartItem.id !== item.id
    );
  }

  get cartCount(): number {
    return this.cart.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }

  get cartTotal(): number {
    return this.cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  openCheckout(): void {

    if (this.cart.length === 0) {
      return;
    }

    this.showCart = false;
    this.showCheckout = true;
  }

  placeOrder(): void {

    if (
      !this.customerName.trim() ||
      !this.customerPhone.trim()
    ) {
      alert('Please enter your name and phone number.');
      return;
    }

    this.showCheckout = false;
    this.orderPlaced = true;
  }

  closeOrderSuccess(): void {

    this.orderPlaced = false;
    this.cart = [];
    this.customerName = '';
    this.customerPhone = '';
    this.customerAddress = '';
  }

}