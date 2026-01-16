const catchAsync = require("express-async-handler");

const ApiFetures = require("./../utlis/ApiFeatures");
const ApiError = require("./../utlis/ApiError");

exports.getAll = (Model, modelName = "") =>
    catchAsync(async (req, res, next) => {
        const filter = {};
        if (req.filterObj) filter = { ...req.filterObj };

        const countDocuments = await Model.countDocuments();
        const features = new ApiFetures(Model.find(filter), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate(countDocuments)
            .keyWordSearch(modelName);

        const { query, paginationResult } = features;
        const docs = await query;

        res.status(200).json({
            status: "success",
            results: docs.length,
            paginationResult,
            data: docs,
        });
    });

exports.getOne = (Model) =>
    catchAsync(async (req, res, next) => {
        const doc = await Model.findById(req.params.id);

        if (!doc) {
            return next(new ApiError("No document found with that ID.", 404));
        }

        res.status(200).json({
            status: "success",
            data: doc,
        });
    });

exports.createOne = (Model) =>
    catchAsync(async (req, res, next) => {
        const newDoc = await Model.create(req.body);

        res.status(201).json({
            status: "success",
            data: newDoc,
        });
    });


exports.updateOne = (Model) =>
    catchAsync(async (req, res, next) => {
        const doc = await Model.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!doc) {
            return next(new ApiError("No document found with that ID.", 404));
        }

        res.status(200).json({
            status: "success",
            data: doc,
        });
    });


exports.deleteOne = (Model) =>
    catchAsync(async (req, res, next) => {
        const doc = await Model.findByIdAndDelete(req.params.id);

        if (!doc) {
            return next(new ApiError("No document found with that ID.", 404));
        }

        res.status(204).json({
            status: "success",
            data: null,
        });
    });
