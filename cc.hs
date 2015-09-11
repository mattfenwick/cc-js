

cons :: a -> [a] -> [a]
cons x xs = (:) x xs

cons2 :: a -> [a] -> ([a] -> b) -> b
cons2 x xs ret = ret ((:) x xs)

{-
map :: (a -> b) -> [a] -> [b]
map _ [] = []
map f (x:xs) = (:) (f x) (map f xs)
-}

map2 :: (a -> b) -> [a] -> ([b] -> d) -> d
map2 _ [] ret = ret []
map2 f (x:xs) ret = map2 f xs (\ys -> 
                    cons2 (f x) ys (\zs -> 
                    ret zs))

-- map3 :: (a -> (b -> c) -> c) -> [a] -> ([b] -> d) -> d
map3 :: (t -> (a -> b) -> b) -> [t] -> ([a] -> b) -> b
map3 _ [] ret = ret []
map3 f (x:xs) ret = map3 f xs $ \ys ->
                    f x $ \y ->
                    cons2 y ys $ \zs ->
                    ret zs

{-
(define (map2 f l k)
(if (null? l)
(k ’())
(f (car l) (lambda (v) (map2 f (cdr l) (lambda (v2 ) (k (cons v v2 ))))))))
-}
map4 _ [] k = k []
map4 f (x:xs) k = 
    f x (\v ->
    map4 f xs (\vs ->
    k (v:vs)))

data Tree
  = Leaf Int 
  | Branch Tree Tree
  deriving (Show)

foldT :: 