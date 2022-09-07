import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Headers'
import {sanityClient, urlFor} from '../sanity'
import Link from 'next/link'

export interface Post {
    _id: string
    _createdAt: string
    title: string
    author: {
        name: string
        image: string
    }
    comments: Comment[]
    description: string
    mainImage: {
        asset: {
            url: string
        }
    }
    slug: {
        current: string
    }
    body: [object]
}

/**
 * to define the Post u can look sanity localhost://3333 and bring the fileds
**/

export interface Comment {
    approved: boolean
    comment: string
    email: string
    name: string
    post:{
        _ref: string
        _type: string
    }
    _createdAt: string
    _id: string
    _rev: string
    _type: string
    _updatedAt: string
}
/**
 * this type definition that is need by the app this type can be found in the sanity schemas
**/
interface props{
    posts:[Post]
}

const Home: NextPage = ({posts}:props) => {
  return (
    <div className="max-w-7xl mx-auto">
        <Head>
            <title>Medium Blog</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <Header />

        <div className="flex justify-between items-center bg-yellow-500 border-y border-black py-10 lg:py-0">
            <div className="px-5 space-y-5">
                <h1 className="text-6xl max-w-xl font-serif">
                    <span className="underline decoration-black decoration-4">Medium</span>{" "}
                    is a place to write, read and connect
                </h1>
                <h2>
                    It is easy and free to post your thinking on any topic and connect with millions of readers
                </h2>
            </div>
            <img className="hidden md:inline-flex h-32 lg:h-full" 
                src="https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png"
            />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:gap-6 md:p-6 p-2">
            {posts.map((post) => (
                <Link key={post._id} href={`/post/${post.slug.current}`}>
                    <div className="group cursor-pointer overflow-hidden border rounded-lg">
                        <img
                            className="h-60 w-full object-cover transition-transform duration-200 ease-in-out group-hover:scale-105"
                            src={urlFor(post.mainImage).url()!}
                            alt=""
                        />
                    
                        <div className="flex justify-between bg-white p-5">
                            <div>
                                <p className="text-lg font-bold">{post.title}</p>
                                <p className="text-xs">
                                    {post.description} by {post.author.name}
                                </p>
                            </div>
                            <img
                                className="h-12 w-12 rounded-full"
                                src={urlFor(post.author.image).url()!}
                            />
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default Home

// after span{" "} is add space

export const getServerSideProps = async()=>{
    const query = `*[_type == "post"]{
        _id,
        title,
        author->{
            name,
            image,
        },
        description,
        mainImage,
        slug
    }`;

    const posts = await sanityClient.fetch(query);
    return{
        props:{
            posts,
        }
    }
}


// author will go to the other field/author bring the name and image
// inorder to have server side rendering we will use getServerSideProps
// {urlFor(post.mainImage).url()!} it means that is not null get by !
