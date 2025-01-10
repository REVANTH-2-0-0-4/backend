```cpp
#include <iostream>

    long long power(long long base, long long exp) {
    if (exp == 0) return 1;
    if (exp == 1) return base;
    if (exp < 0) { if (base==0) throw std::runtime_error("Cannot raise 0 to a negative power."); return 1 / power(base,
        -exp); } long long halfPower=power(base, exp / 2); long long result=halfPower * halfPower; if (exp % 2==1)
        result *=base; return result; } int main() { long long base, exp; std::cin>> base >> exp;
        try {
        std::cout << power(base, exp) << std::endl; } catch (const std::runtime_error& error) { std::cerr << "Error: "
            << error.what() << std::endl; } return 0; } ```