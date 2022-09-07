import Header from '../../components/Headers'
import { GetStaticProps } from 'next'
import { sanityClient, urlFor } from '../../sanity'
import PortableText from 'react-portable-text'
import { useForm, SubmitHandler } from 'react-hook-form'
import {useState, useEffect} from 'react'
import {Post} from '../@types'

interface Props {
    post: Post;
}

interface IFormInput {
    _id: string
    name: string
    email: string
    comment: string
}

// this is typescript that are used to define the form that are used in the comments
// and we have to pass the IFormInput into react-hook-form useform in the form of templates
// we do not have id but we pass the id we do that by passing the hidden input that have id
function Posts({ post }: Props){
    const [submitted, setSubmitted] = useState(false)

	const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormInput>()

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        // by passing the IFormInput we know what type of data it will came
        fetch('/api/createComment', {
            method: 'POST',
            body: JSON.stringify(data),
        })
        .then(() => {
            setSubmitted(true)
        })
        .catch((err) => {
            console.log(err)
            setSubmitted(false)
        })
    }
    // inorder to submit go to form and write onSumbit={handlesubmit(sonSubmit)}
    // handleSubmit is there function and onsubmit is mine function 

	return(
        <>
            <Header />
    		<main className="mx-auto max-w-7xl">
    			<img
                    className="h-40 w-full object-cover"
                    src={urlFor(post.mainImage).url()!}
                    alt=""
                />

                <article className="mx-auto max-w-3xl p-5">
                    <h1 className="mt-10 mb-3 text-3xl ">{post.title}</h1>
                    <h2 className="mb-2 text-xl font-light text-gray-500">
                        {post.description}
                    </h2>
                    <div className="flex items-center space-x-2">
                        <img
                            className="h-10 w-10 rounded-full"
                            src={urlFor(post.author.image).url()!}
                            alt=""
                        />

                        <p className="text-sm font-extralight">
                            Blog post by{' '}
                            <span className="text-green-600">{post.author.name}</span> -
                            published at {new Date(post._createdAt).toLocaleString()}
                        </p>
                    </div>
                  
                    <div className="mt-10">
                        <PortableText
                            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
                            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
                            content={post.body}
                            serializers={{
                                h1: (props: any) => (
                                    <h1 className="my-5 text-2xl font-bold" {...props} />
                                ),
                                h2: (props: any) => (
                                    <h2 className="my-5 text-xl font-bold" {...props} />
                                ),
                                li: ({ children }: any) => (
                                    <li className="ml-4 list-disc">{children}</li>
                                ),
                                link: ({ href, children }: any) => (
                                <a href={href} className="text-blue-500 hover:underline mt-5">
                                    {children}
                                </a>),
                            }}
                        />
                    </div>
                </article>

                <hr className="my-5 mx-auto max-w-lg border border-yellow-500" />
                { submitted ? (
                    <div className="my-10 mx-auto flex max-w-2xl flex-col bg-yellow-500 p-10 text-white">
                        <h3 className="text-3xl font-bold">
                            Thank you for submitting your comment!
                        </h3>
                        <p>Once it has been approved, it will appear below!</p>
                    </div>
                ) : (
                    <form
                        className="mx-auto mb-10 flex max-w-2xl flex-col p-5"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <h3 className="text-sm text-yellow-500">Enjoyed this article?</h3>
                        <h4 className="text-3xl font-bold">Leave a comment below!</h4>
                        <hr className="mt-2 py-3" />
                        <input
                            type="hidden"
                            {...register('_id')}
                            name="_id"
                            value={post._id}
                        />
                
                        <label className="mb-5 block">
                            <span className="text-gray-700">Name</span>
                            <input
                                {...register('name', { required: true })}
                                className="form-input mt-1 block w-full rounded border py-2 px-3 shadow ring-yellow-500"
                                placeholder="Yafet Appleseed"
                                type="text"
                            />
                        </label>

                        <label className="mb-5 block">
                            <span className="text-gray-780">Email</span>
                            <input
                                {...register('email', { required: true })}
                                className="form-input mt-1 block w-full rounded border py-2 px-3 shadow ring-yellow-500"
                                placeholder="Yafet Appleseed"
                                type="text"
                            />
                        </label>

                        <label className="mb-5 block">
                            <span className="text-gray-700">Comment</span>
                            <textarea
                                {...register('comment', { required: true })}
                                className="form-input mt-1 block w-full rounded border py-2 px-3 shadow ring-yellow-500"
                                placeholder="Yafet Appleseed"
                                rows={8}
                            />
                        </label>

                        <div className="flex flex-col p-5">
                            {errors.name && <p className="text-red-500">Name is required</p>}
                            {errors.email && (
                                <p className="text-red-500">Email is required</p>
                            )}
                            {errors.comment && (
                                <p className="text-red-500">Comment is required</p>
                            )}
                        </div>
                        <input
                            type="submit"
                            className="focus:shadow-outline cursor-pointer rounded bg-yellow-500 py-2 px-4 font-bold text-white shadow hover:bg-yellow-400 focus:outline-none"
                        />
                    </form>
                )}

                <div className="my-5 mx-auto flex max-w-2xl flex-col space-y-2 p-10 shadow shadow-yellow-500">
                    <h3>Comments</h3>
                    <hr />
                    {post.comments.map((comment) => (
                        <div key={comment._id}>
                            <p>
                                <span className="text-yellow-500"> {comment.name}:</span>{' '}
                                {comment.comment}
                            </p>
                        </div>
                    ))}
                </div>
    		</main>
        </>
	)
}

// read more about portabletext
// to send data using form we will use react-hook-form
// first install it then import it
// we pass {...register('the name',{required:true})}
// required true means if it is blank or not given give us error message
// so in the bottom by giving the errors.the reaquired part it give us the error
export default Posts

// we need getStaticPaths to prefetch before it render the specific post 
// all the post data must be prefetched by using the id and slung

export const getStaticPaths = async ()=>{
	const query = `*[_type=='post']{
        _id,
        slug{
            current
        }
    }`

    const posts = await sanityClient.fetch(query)
    // query get all the post by using the id and slung
  	const paths = posts.map((post: Post) => ({
    	params: {
      		slug: post.slug.current,
    	},
  	}))

  	return {
    	paths,
    	fallback: 'blocking',
  	}
  	// inorder to get the path in next.js to pass the path we create an oject then pass the object
	// the key is the parameters and value is actual path
	// post:post is type script that tell that is post
	// fallback:'blocking' if it does not exist give 404 error	
}

// we get all the data by using the getStaticPaths but how we do we know to   
// render a specific post that match with the url to do that we use the slug 
// and the id to use that again we use again getStaticProps
// GetStaticProps is pulled from typescript 
export const getStaticProps: GetStaticProps = async ({ params }) => {
  	const query = `*[_type=='post' && slug.current==$slug][0]{
    	_id,
        _createdAt,
        title,
        author->{
            name,
            image
        },
        'comments':*[_type=='comment' && post._ref==^._id && approved ==true],
        description,
        mainImage,
        slug,
        body,
        
    }    
    `
    // slug.current==$slug is to get the current slug then if we do not give [0] it will give us array form
	// to get the object or in other word to remove the array we give [0]
    const post = await sanityClient.fetch(query, {
    	slug: params?.slug,
  	});

  	if (!post) {
    	return {
      		notFound: true,
    	}
  	}

  	return {
    	props: {
      		post,
    	},
    	revalidate: 60, 
        //after 60 seconds, it will update the old cached version
        //which means every 60 seconds it will be updated so if the post change it will be updated
  	}
}


// the next is $slug is show it can have value to do that we go to post we pass the query and slung: can have
// value by using this code params?.slug the ? is to tell that it is undefined and we know it
// if there is no post  the if statement will return notFound == true which give us 404 error
// if the third post does not exit it will give 404 error