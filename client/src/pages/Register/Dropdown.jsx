// import React, { Fragment, useState } from 'react';
// import { Menu, Transition } from '@headlessui/react';
// import { ChevronDownIcon } from '@heroicons/react/20/solid';




// function classNames(...classes) {
//     return classes.filter(Boolean).join(' ');
//   }

// export default function Dropdown(props) {

//   const [selectedRole, setSelectedRole] = useState(null);

//   const handleRoleSelection = (role) => {
//     setSelectedRole(role);
//     // Do something with the selected role, such as passing it to a parent component via props or updating state
//     console.log('Selected role:', role);
//   };

//   return (
//     <Menu as="div" className="relative inline-block text-left w-full py-2">
//       <div>
//         <Menu.Button className="inline-flex w-full justify-left gap-x-1.5 mt-1 p-2 w-full text-sm border rounded-md focus:outline-zinc-400 outline outline-1 outline-zinc-300 rounded-md bg-white px-2 py-2  hover:bg-gray-50">
//           {selectedRole || 'Select your role'}
//           <ChevronDownIcon className="ml-40 h-5 w-5 text-gray-400" aria-hidden="true" />
//         </Menu.Button>
//       </div>

//       <Transition
//         as={Fragment}
//         enter="transition ease-out duration-100"
//         enterFrom="transform opacity-0 scale-95"
//         enterTo="transform opacity-100 scale-100"
//         leave="transition ease-in duration-75"
//         leaveFrom="transform opacity-100 scale-100"
//         leaveTo="transform opacity-0 scale-95"
//       >
//         <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//           <div className="py-1">
//             <Menu.Item>
//               {({ active }) => (
//                 <a
//                   href="#"
//                   onClick={() => handleRoleSelection('FACULTY')}
//                   className={classNames(
//                     active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
//                     'block px-4 py-2 text-sm'
//                   )}
//                 >
//                   FACULTY
//                 </a>
//               )}
//             </Menu.Item>
//             <Menu.Item>
//               {({ active }) => (
//                 <a
//                   href="#"
//                   onClick={() => handleRoleSelection('HOD')}
//                   className={classNames(
//                     active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
//                     'block px-4 py-2 text-sm'
//                   )}
//                 >
//                   HOD
//                 </a>
//               )}
//             </Menu.Item>
//             <Menu.Item>
//               {({ active }) => (
//                 <a
//                   href="#"
//                   onClick={() => handleRoleSelection('REGISTRAR')}
//                   className={classNames(
//                     active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
//                     'block px-4 py-2 text-sm'
//                   )}
//                 >
//                   REGISTRAR
//                 </a>
//               )}
//             </Menu.Item>
//             <Menu.Item>
//               {({ active }) => (
//                 <a
//                   href="#"
//                   onClick={() => handleRoleSelection('STUDENT')}
//                   className={classNames(
//                     active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
//                     'block px-4 py-2 text-sm'
//                   )}
//                 >
//                   STUDENT
//                 </a>
//               )}
//             </Menu.Item>
//           </div>
//         </Menu.Items>
//       </Transition>
//     </Menu>
//   );
// }
