import { Request, Response, NextFunction } from "express";
const BillingCycle = require("./billingCycle");
const errorHandler = require("./common/errorHandler");

BillingCycle.methods(["get", "post", "put", "delete"]);
BillingCycle.updateOptions({ new: true, runValidators: true });
BillingCycle.after("post", errorHandler).after("put", errorHandler);

BillingCycle.route("get", (req: Request, res: Response, next: NextFunction) => {
  BillingCycle.find({}, (err: any, docs: any) => {
    if (err) {
      res.status(500).json({ errors: [err] });
    } else {
      res.json(docs);
    }
  })
    .skip(req.query.skip)
    .limit(req.query.limit);
});

BillingCycle.route(
  "count",
  (req: Request, res: Response, next: NextFunction) => {
    BillingCycle.count({}, (err: any, value: any) => {
      if (err) {
        res.status(500).json({ errors: [err] });
      } else {
        res.json(value);
      }
    });
  }
);

BillingCycle.route(
  "summary",
  (req: Request, res: Response, next: NextFunction) => {
    BillingCycle.aggregate([
      {
        $project: {
          credit: { $sum: "$credits.value" },
          debt: { $sum: "$debts.value" },
        },
      },
      {
        $group: {
          _id: null,
          credit: { $sum: "$credit" },
          debt: { $sum: "$debt" },
        },
      },
      {
        $project: { _id: 0, credit: 1, debt: 1 },
      },
    ]).exec((error: any, result: any) => {
      if (error) {
        res.status(500).json({ errors: [error] });
      } else {
        res.json(result[0] || { credit: 0, debt: 0 });
      }
    });
  }
);

module.exports = BillingCycle;
