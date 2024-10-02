const Post = require('../models/Post');
const { validationResult } = require('express-validator');
const ApiResponse = require('../utils/ApiResponse');

exports.createPost = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(new ApiResponse(400, 'Bad Request', null, errors.array()));
    }

    const { title, description, images} = req.body;

    try {
        const post = new Post({
            title, 
            description, 
            images,
        });

        await post.save();

        res.status(201).json(new ApiResponse(201, 'Created', post));
    } catch (err) {
        console.error(err.message);
        res.status(500).json(new ApiResponse(500, 'Server Error', null));
    }
};

exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(new ApiResponse(200, 'OK', posts));
    } catch (err) {
        console.error(err.message);
        res.status(500).json(new ApiResponse(500, 'Server Error', null));
    }
};

exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json(new ApiResponse(404, 'Not Found', null, 'Post not found'));
        }
        res.status(200).json(new ApiResponse(200, 'OK', post));
    } catch (err) {
        console.error(err.message);
        res.status(500).json(new ApiResponse(500, 'Server Error', null));
    }
};

exports.updatePost = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(new ApiResponse(400, 'Bad Request', null, errors.array()));
    }

    const { nombre, descripcion, descripcionLarga, nombreLocalizacion, tipo, imagen, latitud, longitud, codigo, iconoPrimario, iconoSecundario, iconoTerciario } = req.body;

    try {
        let post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json(new ApiResponse(404, 'Not Found', null, 'Post not found'));
        }

        if (nombre) post.nombre = nombre;
        if (descripcion) post.descripcion = descripcion;
        if (descripcionLarga) post.descripcionLarga = descripcionLarga;
        if (nombreLocalizacion) post.nombreLocalizacion = nombreLocalizacion;
        if (tipo) post.tipo = tipo;
        if (imagen) post.imagen = imagen;
        if (latitud) post.latitud = latitud;
        if (longitud) post.longitud = longitud;
        if (codigo) post.codigo = codigo;
        if (iconoPrimario) post.iconoPrimario = iconoPrimario;
        if (iconoSecundario) post.iconoSecundario = iconoSecundario;
        if (iconoTerciario) post.iconoTerciario = iconoTerciario;

        await post.save();

        res.status(200).json(new ApiResponse(200, 'OK', post));
    } catch (err) {
        console.error(err.message);
        res.status(500).json(new ApiResponse(500, 'Server Error', null));
    }
};

exports.deletePost = async (req, res) => {
    try {
        let post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json(new ApiResponse(404, 'Not Found', null, 'Post not found'));
        }

        await post.remove();

        res.status(200).json(new ApiResponse(200, 'OK', 'Post deleted'));
    } catch (err) {
        console.error(err.message);
        res.status(500).json(new ApiResponse(500, 'Server Error', null));
    }
};
