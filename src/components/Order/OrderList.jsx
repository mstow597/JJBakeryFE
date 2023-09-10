import OrderItem from './OrderItem';
import styles from './OrderList.module.css';

export default (props) => {
  return (
    <ul className={styles['order-list']}>
      {props.productList.map((item) => (
        <OrderItem key={item._id} item={item}></OrderItem>
      ))}
    </ul>
  );
};
