import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="relative w-10 h-10 rounded-full hover:bg-transparent"
            title="Toggle Theme"
        >
            <div className="absolute inset-0 flex items-center justify-center">
                {/* Sun Icon (Light Mode) */}
                <motion.div
                    initial={{ rotate: 0, scale: 1, opacity: 1 }}
                    animate={{
                        rotate: theme === "light" ? 0 : 90,
                        scale: theme === "light" ? 1 : 0,
                        opacity: theme === "light" ? 1 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                    className="absolute"
                >
                    <Sun className="h-[1.5rem] w-[1.5rem] text-orange-500 fill-orange-500/20" />
                </motion.div>

                {/* Moon Icon (Dark Mode) */}
                <motion.div
                    initial={{ rotate: -90, scale: 0, opacity: 0 }}
                    animate={{
                        rotate: theme === "dark" ? 0 : -90,
                        scale: theme === "dark" ? 1 : 0,
                        opacity: theme === "dark" ? 1 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                    className="absolute"
                >
                    <Moon className="h-[1.5rem] w-[1.5rem] text-cyan-400 fill-cyan-400/20" />
                </motion.div>
            </div>
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
