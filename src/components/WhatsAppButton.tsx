import { motion } from 'motion/react';

export default function WhatsAppButton() {
  const phoneNumber = "212600000000"; // Replace with actual number
  const message = "Bonjour, j'aimerais avoir plus d'informations sur vos parfums.";

  return (
    <motion.a
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-black text-white rounded-full shadow-lg hover:bg-gray-900 transition-colors duration-300"
      aria-label="Contact us on WhatsApp"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="28" 
        height="28" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className="fill-current stroke-none"
      >
        <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.303-.345.451-.523.151-.18.2-.3.3-.497.098-.196.05-.368-.024-.516-.073-.15-2.107-5.061-2.007-4.863-.3-.6-.603-.518-.83-.528-.224-.01-.479-.01-.734-.01-.254 0-.669.093-1.017.469-.35.375-1.338 1.311-1.338 3.198 0 1.886 1.375 3.706 1.566 3.963.192.257 2.716 4.143 6.576 5.81 2.673 1.155 3.218.925 3.803.867.585-.058 1.872-.766 2.136-1.506.264-.74.264-1.375.185-1.506-.08-.131-.297-.21-.598-.36z"/>
        <path d="M12.009 2.012c-5.495 0-9.968 4.46-9.968 9.946 0 1.745.453 3.435 1.315 4.93l-1.398 5.106 5.234-1.371c1.436.781 3.064 1.192 4.715 1.194h.004c5.495 0 9.966-4.461 9.966-9.948 0-2.657-1.036-5.155-2.916-7.033-1.879-1.879-4.378-2.913-7.042-2.913zM12.009 20.06c-1.488 0-2.945-.4-4.22-1.157l-.302-.18-3.136.822.837-3.056-.197-.313c-.838-1.333-1.28-2.876-1.28-4.466 0-4.611 3.764-8.363 8.39-8.363 2.238 0 4.342.871 5.925 2.453 1.583 1.582 2.454 3.684 2.454 5.921 0 4.61-3.765 8.363-8.388 8.363z"/>
      </svg>
    </motion.a>
  );
}
