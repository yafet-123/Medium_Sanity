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
