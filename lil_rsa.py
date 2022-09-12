# lil rsa 

import math
import sys

# Functions for computing the greatest common divisor 
# and Euler’s Totient Function using Python are provided below.
def gcd(a, b):
  if (a == 0):
    return b
  return gcd(b % a, a)

# This function outputs the number of integers between 0 and n
# that are relatively prime to n meaning they dont share a common divisor
# ex phi(8) = 4 because 1,3,5,7 are relatively prime to 8
def phi(n):
  count = 1
  for i in range(2, n):
    if (gcd(i, n) == 1):
      count += 1
  return count


def gen_keys():
  # primes up to 10k for ease 
  primes = file = open("primes", "r").read().splitlines()
  p1 = int( random.choice(primes) )
  p2 = int( random.choice(primes) )

  # https://macs4200.org/chapters/11/3/rsa.html
  n = p1 * p2
  print(f"p1: {p1} p2: {p2} n: {n} ")

  # compute phi(n)
  phi_n = phi(n)
  print(f"p1: {p1} p2: {p2} n: {n} phi_n: {phi_n}")

  # choose any e such that e and phi(n) are relative prime
  found_e = False
  e = -1 
  while found_e == False:
    ee = random.randint(2, phi_n)
    if gcd(ee, phi_n) == 1:
      found_e = True
      e = ee

  print(f"p1: {p1} p2: {p2} n: {n} phi_n: {phi_n} e: {e}")

  # msg = int(input("enter message: "))
  # print(f"encrypting {msg}")


gen_keys()