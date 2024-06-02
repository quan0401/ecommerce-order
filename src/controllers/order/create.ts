import { BadRequestError, IOrderDocument } from '@quan0401/ecommerce-shared';
import { StatusCodes } from 'http-status-codes';
import { orderScheme } from '~/schemes/order.scheme';
import { createOrder } from '~/services/order.service';
import { Request, Response } from 'express';

export const order = async (req: Request, res: Response): Promise<void> => {
  const { error } = await Promise.resolve(orderScheme.validate(req.body));
  if (error?.details) {
    throw new BadRequestError(error.details[0].message, 'Create order() method');
  }
  const serviceFee: number = req.body.price < 50 ? (5.5 / 100) * req.body.price + 2 : (5.5 / 100) * req.body.price;
  let orderData: IOrderDocument = req.body;
  orderData = { ...orderData, serviceFee };
  const order: IOrderDocument = await createOrder(orderData);
  res.status(StatusCodes.CREATED).json({ message: 'Order created successfully.', order });
};
