import { notifications } from '~/controllers/notification/get';
import { order } from '~/controllers/order/create';
import { buyerOrders, orderId, sellerOrders } from '~/controllers/order/get';
import { buyerApproveOrder, deliverOrder, deliveryDate, requestExtension } from '~/controllers/order/update';
import { markNotificationAsRead } from '~/services/notification.service';
import express, { Router } from 'express';

const router: Router = express.Router();

const orderRoutes = (): Router => {
  router.get('/notification/:userTo', notifications);
  router.get('/seller/:sellerId', sellerOrders);
  router.get('/buyer/:buyerId', buyerOrders);
  router.get('/:orderId', orderId);
  router.post('/', order);
  // router.post('/create-payment-intent', intent);
  // router.put('/cancel/:orderId', cancel);
  router.put('/extension/:orderId', requestExtension);
  router.put('/deliver-order/:orderId', deliverOrder);
  router.put('/approve-order/:orderId', buyerApproveOrder);
  router.put('/gig/:type/:orderId', deliveryDate);
  router.put('/notification/mark-as-read', markNotificationAsRead);

  return router;
};

export { orderRoutes };
