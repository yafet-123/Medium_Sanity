import Link from 'next/link'
import Image from 'next/image'
function Header(){
	return(
		<header className="flex items-center justify-between p-5 max-w-7xl mx-auto">
			<div className="flex items-center space-x-5">
				<Link href="/">
					<Image 
						className="w-44 object-contain cursor-pointer" 
						alt="" 
						width={100}
						height={44}
						src="https://links.papareact.com/yvf" 
					/>
				</Link>

				<div className="hidden md:inline-flex items-center space-x-5">
					<h3>About</h3>
					<h3>Contact</h3>
					<h3 className="text-white bg-green-600 px-4 py-1 rounded-full">Follow</h3>
				</div>
			</div>

			<div className="flex items-center space-x-5 text-green-500">
				<h3>Sign In</h3>
				<h3 className="border px-4 py-1 rounded-full border-green-600">Get Started</h3>
			</div>
		</header>
	)
}

export default Header

// md:inline-flex means from medium up to large it will be flex but small screen or mobile it will
// be hidden target small then medium then large and space-x-5 means space between then is 5 hidden means hide in the small screen
// max-w-7xl means set the maximum width 7xl which is 80 rem