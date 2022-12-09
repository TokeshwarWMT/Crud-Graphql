const Post = require('./models/postModel');

const resolvers = {
    Query: {
        hello: () => {
            return 'hello world';
        },
        getAllPosts: async () => {
            return await Post.find()
        },
        getPost: async (_parent, { id }, _context, _info) => {
            return await Post.findById(id)
        }

    },
    Mutation: {
        createPost: async (parent, args, context, info) => {
            const { name, email, password } = args.post;
            const emailExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            const isValidEmail = emailExpression.test(String(email).toLowerCase())
            if (!isValidEmail)
                throw new Error('email not in proper format!!')

            const checkEmail = await Post.findOne({ email });
            if (checkEmail) {
                throw new Error("email is already exists, please try another one!!")
            }

            const post = new Post({ name, email, password })
            await post.save();
            return post;
        },

        updatePost: async (parent, { id }, data, context, info) => {
            const { name, email, password } = data;
            return await Post.findByIdAndUpdate(id, { ...data }, { new: true })
        },

        deletePost: async (parent, args, context, info) => {
            const { id } = args;
            const post = await Post.findById(id);
            if (!post) {
                throw new Error("objectId does not exist!!")
            };
            await Post.findByIdAndRemove(id);
            return 'data deleted successfully'
        }
    }
};

module.exports = resolvers;