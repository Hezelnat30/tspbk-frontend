"use client";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FiAlertTriangle, FiArrowLeft } from "react-icons/fi";

export default function Notfound() {
  const { push } = useRouter();
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-primary-yellow/10"
      />
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute -top-20 -right-32 w-64 h-64 rounded-full bg-primary-yellow/10"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-center space-y-8"
      >
        {/* 404 Number */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <h1 className="text-6xl md:text-9xl font-bold text-primary-yellow mb-4">
            404
          </h1>
        </motion.div>

        {/* Icon & Text */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col items-center"
        >
          <div className="relative">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="p-4 bg-primary-yellow/10 rounded-full mb-6"
            >
              <FiAlertTriangle className="w-16 h-16 text-primary-yellow" />
            </motion.div>
          </div>

          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
            Halaman Tidak Ditemukan
          </h2>
          <p className="text-gray-600 mt-2 max-w-md mx-auto">
            Sepertinya Anda tersesat...
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Button
            onPress={() => push("/")}
            startContent={<FiArrowLeft className="text-lg" />}
            className="inline-flex items-center bg-primary-yellow text-white px-8 py-6 rounded-xl
              hover:scale-95 transition-all ease-in-out duration-200 font-medium
              shadow-lg hover:shadow-md gap-2"
          >
            Kembali ke Beranda
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 1.5, delay: 0.2 }}
        className="absolute bottom-0 h-1.5 bg-primary-yellow/30"
      />
    </div>
  );
}
