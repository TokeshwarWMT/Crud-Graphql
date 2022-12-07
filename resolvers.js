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
            const post = new Post({ name, email, password })
            await post.save();
            return post;
        },
        updatePost: async (parent, { id }, data, context, info) => {
            const { name, email, password } = data;
            console.log(data)
            return await Post.findByIdAndUpdate(id, { ...data })
        },
        deletePost: async (parent, args, context, info) => {
            const { id } = args;
            await Post.findByIdAndRemove(id);
            return 'data deleted successfully'
        }
    }
};

module.exports = resolvers;