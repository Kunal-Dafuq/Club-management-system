router.post(
    "/cleanup",
    protect,
    allowRoles("SUPER_ADMIN"),
    adminController.cleanup
);