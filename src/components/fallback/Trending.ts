import { IPost } from '../../services/post.service';

const now = new Date().toISOString();

export const fallbackTrendingPosts: IPost[] = [
    {
        _id: 'fallback-1',
        slug: 'michael-jackson-super-bowl-1993',
        title: 'The Greatest Super Bowl Halftime Show in History',
        excerpt: 'How Michael Jackson redefined the Super Bowl halftime show in 1993, creating a blueprint that every artist has followed since.',
        type: 'video',
        thumbnail: 'https://i.pinimg.com/736x/b3/32/e3/b332e3d601797f7a2a2cb312c3250cf2.jpg',
        viewsCount: 1542000,
        createdAt: now,
        updatedAt: now,
        status: 'published',
        featured: true,
        pinnedTrending: true,
        trendingScore: 100,
        category: { 
            _id: 'c1', 
            name: 'Live Performance', 
            slug: 'live-performance' 
        },
        author: {
            _id: 'a1',
            fullName: 'Archive Admin'
        }
    },
    {
        _id: 'fallback-2',
        slug: 'thriller-making-of-documentary',
        title: 'Behind the Scenes: The Making of Thriller',
        excerpt: 'Explore the untold stories and groundbreaking techniques used to create the most iconic music video of all time.',
        type: 'article',
        thumbnail: 'https://i.pinimg.com/1200x/8e/cb/72/8ecb721fbc80ce1157f82f0ebf40f2f8.jpg',
        viewsCount: 892000,
        createdAt: now,
        updatedAt: now,
        status: 'published',
        featured: false,
        pinnedTrending: false,
        trendingScore: 90,
        category: { 
            _id: 'c2', 
            name: 'Documentary', 
            slug: 'documentary' 
        },
        author: {
            _id: 'a1',
            fullName: 'Archive Admin'
        }
    },
    {
        _id: 'fallback-3',
        slug: 'motown-25-first-moonwalk',
        title: 'Motown 25: The First Moonwalk',
        excerpt: 'The night music history was made. A deep dive into the performance that introduced the Moonwalk to the world.',
        type: 'video',
        thumbnail: 'https://i.pinimg.com/736x/44/2c/84/442c84e00d1ba6067b84eeca26e72dab.jpg',
        viewsCount: 2305000,
        createdAt: now,
        updatedAt: now,
        status: 'published',
        featured: true,
        pinnedTrending: false,
        trendingScore: 85,
        category: { 
            _id: 'c1', 
            name: 'Live Performance', 
            slug: 'live-performance' 
        },
        author: {
            _id: 'a1',
            fullName: 'Archive Admin'
        }
    },
    {
        _id: 'fallback-4',
        slug: 'bad-album-retrospective',
        title: 'The Bad Album: A Sonic Masterpiece',
        excerpt: 'Reviewing the heavy basslines, aggressive synthesizers, and pure attitude of the Bad era.',
        type: 'audio',
        thumbnail: 'https://i.pinimg.com/1200x/a6/87/df/a687df0bb5b7752ca9675f3cbbfb5331.jpg',
        viewsCount: 650000,
        createdAt: now,
        updatedAt: now,
        status: 'published',
        featured: false,
        pinnedTrending: false,
        trendingScore: 75,
        category: { 
            _id: 'c3', 
            name: 'Music Analysis', 
            slug: 'music-analysis' 
        },
        author: {
            _id: 'a1',
            fullName: 'Archive Admin'
        }
    }
];